import { AppDataSource } from '../dataSource.js';
import { Admin } from '../entities/Admin.js';

const adminRepository = AppDataSource.getRepository(Admin);

async function getAllAdmins(): Promise<Admin[]> {
  return adminRepository.find();
}

async function getAdminById(adminId: string): Promise<Admin | null> {
  return adminRepository.findOne({ where: { adminId } });
}

async function addAdmin(name: string, email: string, passwordHash: string): Promise<Admin> {
  const newAdmin = adminRepository.create({ name, email, passwordHash });
  return adminRepository.save(newAdmin);
}

async function updateAdminEmail(adminId: string, newEmail: string): Promise<Admin | null> {
  const admin = await adminRepository.findOne({ where: { adminId } });

  if (!admin) {
    return null;
  }

  admin.email = newEmail;
  return adminRepository.save(admin);
}

async function deleteAdminById(adminId: string): Promise<void> {
  const admin = await adminRepository.findOne({ where: { adminId } });

  if (!admin) {
    return;
  }

  await adminRepository.remove(admin);
}

async function getAdminsByVerifiedStatus(isVerified: boolean): Promise<Admin[]> {
  return adminRepository.find({ where: { verifiedEmail: isVerified } });
}

export {
  getAllAdmins,
  getAdminById,
  addAdmin,
  updateAdminEmail,
  deleteAdminById,
  getAdminsByVerifiedStatus,
};
//make changes that are nessecery
