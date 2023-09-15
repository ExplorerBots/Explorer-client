import { links } from '@/constants';

class AdminService {
   private URL = links.BACKEND + '/admin';
}

export const adminService = new AdminService();
