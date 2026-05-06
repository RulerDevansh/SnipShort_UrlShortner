import api from './api';

export const linkService = {
  create:       (data) => api.post('/links', data),
  createPublic: (data) => api.post('/links/public', data),
  getAll:       ()     => api.get('/links'),
  delete:       (id)   => api.delete(`/links/${id}`),
  getStats:     (id)   => api.get(`/links/${id}/stats`),
};
