import BaseService from '../../service/base-service'

class Service extends BaseService {
  getProfessions(search?: string, ordering?: string) {
    return this.get('/api/professions/without_pagination')
  }
}

export const service = new Service();