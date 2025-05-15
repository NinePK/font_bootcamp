import axios from './axios';
import type {
  Activity,
  ActivityDetail,
  ActivityFilterParams,
  ActivitySummary,
  Applicant,
  ActivityPayload,
  
} from '@/types/activity';
import type { PaginatedData } from '@/types/pagination';

export const activityService = {
  async getApproved(params: ActivityFilterParams): Promise<PaginatedData<Activity>> {
    const res = await axios.get('/activities/approved', { params });
    return res.data;
  },

  async getById(id: string): Promise<ActivityDetail> {
    const res = await axios.get(`/activities/${id}`);
    return res.data;
  },

  async toggleRegistration(id: string): Promise<{ success: boolean }> {
    const res = await axios.post(`/activities/${id}/toggle`);
    return res.data;
  },

  async getMyActivities(): Promise<Activity[]> {
    const res = await axios.get('/activities/my');
    return res.data;
  },
    async getAll(params: ActivityFilterParams): Promise<PaginatedData<Activity>> {
    const res = await axios.get('/activities', { params });
    return res.data;
  }, 

  async getMySummary(): Promise<ActivitySummary> {
    const res = await axios.get('/activities/summary');
    return res.data;
  },

  async getStaffSummary(): Promise<{
    totalActivities: number;
    pendingApprovals: number;
    upcomingActivities: number;
  }> {
    const res = await axios.get('/activities/staff/summary');
    return res.data;
  },

  async create(data: ActivityPayload): Promise<ActivityDetail> {
    const res = await axios.post('/activities', data);
    return res.data;
  },

  async update(id: string, data: ActivityPayload): Promise<ActivityDetail> {
    const res = await axios.put(`/activities/${id}`, data);
    return res.data;
  },

  async getApplicants(activityId: string): Promise<Applicant[]> {
    const res = await axios.get(`/activities/${activityId}/applicants`);
    return res.data;
  },

  async approveApplicant(activityId: string, applicantId: string): Promise<{ success: boolean }> {
    const res = await axios.post(
      `/activities/${activityId}/applicants/${applicantId}/approve`
    );
    return res.data;
  },

  async rejectApplicant(activityId: string, applicantId: string): Promise<{ success: boolean }> {
    const res = await axios.post(
      `/activities/${activityId}/applicants/${applicantId}/reject`
    );
    return res.data;
  },

  

  
};
