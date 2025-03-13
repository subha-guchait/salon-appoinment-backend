const Role = require("../models/role.model");

const seedRoles = async () => {
  try {
    const roles = ["admin", "staff", "customer"];

    for (let roleName of roles) {
      const existingRole = await Role.findOne({ where: { name: roleName } });
      if (!existingRole) {
        await Role.create({ name: roleName });
        console.log(`Role '${roleName}' created.`);
      }
    }

    console.log("All roles are seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding roles:", error.message);
    process.exit(1);
  }
};

seedRoles();
