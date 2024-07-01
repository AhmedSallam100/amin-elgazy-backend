const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

/** =============================
  * @desc  Register admin
  * @method  Internal function
=============================*/
const createAdminAccounts = async () => {
  try {
    const adminAccounts = [
      {
        name: "أحلام عاطف",
        email: "ahlamatef550@gmail.com",
        password: "54ah80@0",
        isAdmin: true,
      },
      {
        name: "أمين الغازي",
        email: "caramen5577@gmail.com",
        password: "215am85z",
        isAdmin: true,
      },
    ];

    for (let adminData of adminAccounts) {
      const { email } = adminData;
      const existingAdmin = await Admin.findOne({ email });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminData.password, 12);
        await Admin.create({
          ...adminData,
          password: hashedPassword,
        });
        console.log(`Admin account created successfully for ${email}`);
      } else {
        console.log(`Admin account already exists for ${email}`);
      }
    }
  } catch (error) {
    console.error("Error creating admin accounts:", error);
  }
};

module.exports = createAdminAccounts;
