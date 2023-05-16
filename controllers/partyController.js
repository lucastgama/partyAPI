const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  if (priceSum > budget) {
    return false;
  }
  return true;
};

const partyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };
      //Budget < valor dos servicos !=
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: "Oseu orcamento e insuficiente" });
        return;
      }

      const response = await PartyModel.create(party);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();
      res.json(parties);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const party = await PartyModel.findById(id);
      if (!party) {
        res.status(404).json({ message: "Festa nao encontrada!!!!" });
        return;
      }
      res.json({ party, msg: "Festa encontrada" });
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const party = await PartyModel.findById(id);
      if (!party) {
        res.status(404).json({ message: "Festa nao encontrada!!!!" });
        return;
      }
      const deleteParty = await PartyModel.findByIdAndDelete(id);
      res.json({ deleteParty, msg: "Festa excluida" });
    } catch (error) {}
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };
      const updateParty = await PartyModel.findByIdAndUpdate(id, party);
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: "Oseu orcamento e insuficiente" });
        return;
      }
      res.json({ updateParty, msg: "Atualizado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = partyController;
