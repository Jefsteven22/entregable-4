const { Conversation, User, Participant } = require("../../models");

const createConversation = async (req, res, next) => {
  try {
    const { userId, participantId } = req.body;
    // creo la conversacion
    const conversation = await Conversation.create({ createdBy: userId });
    // agregar a los participantes a la conversacion --> creandolos en la tabla pivote
    const { id } = conversation;
    const user = await User.findByPk(userId);
    const participant = await User.findByPk(participantId);
    await conversation.addUser(user);
    await conversation.addUser(participant);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

// poder manipular tabla pivote
// participantsId ---> arreglo de ids

const createGroupConversation = async (req, res, next) => {
  try {
    // ? cuantos participantes se van a enviar cuando se crea el grupo
    const { userId, participantsIds, title } = req.body;
    const conversacion = await Conversation.create({
      createdBy: userId,
      title,
      type: "group",
    });
    // necesitamos crear a los participantes en la tabla pivote
    // {userId, ConversationId}
    // agregar el userId dentro del arreglo participantsId
    const createParticipants = [...participantsIds, userId].map(
      (participant) => ({
        ConversationId: conversacion.id,
        UserId: participant,
      })
    );
    await Participant.bulkCreate(createParticipants);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const getAllConversations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversations = await Participant.findAll({
      where: { UserId: id },
      attributes: {
        exclude: ["UserId", "ConverationId"],
      },
      include: {
        model: Conversation,
        include: {
          model: Participant,
          attributes: ["UserId"],
          include: {
            model: User,
            attributes: ["firstname", "lastname", "avatar"],
          },
        },
      },
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  createGroupConversation,
  getAllConversations,
};
