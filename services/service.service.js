const Service = require("../models/service.model");

const getAllServices = async () => {
  try {
    return await Service.findAll();
  } catch (err) {
    throw new Error("unable to get all services");
  }
};

const createNewService = async (serviceData) => {
  try {
    return await Service.create(serviceData);
  } catch (err) {
    throw new Error("unable to create service");
  }
};

const updateServiceRecord = async (serviceId, updatedData) => {
  try {
    const [updatedRows] = await Service.update(updatedData, {
      where: { id: serviceId },
    });

    // here updated rows always be 1 if valid servuice id provided because MySQL always returns 1 for successful UPDATE, even if no data changed.

    return updatedRows > 0;
  } catch (err) {
    throw new Error("unable to update service");
  }
};

const getServiceRecord = async (serviceId) => {
  try {
    return await Service.findByPk(serviceId);
  } catch (err) {
    console.log(err);
    throw new Error("unable to get service");
  }
};

const deleteServiceRecord = async (serviceId) => {
  try {
    const deletedRows = await Service.destroy({ where: { id: serviceId } });
    return deletedRows > 0;
  } catch (err) {
    throw new Error("unable to delete service");
  }
};

module.exports = {
  getAllServices,
  createNewService,
  updateServiceRecord,
  getServiceRecord,
  deleteServiceRecord,
};
