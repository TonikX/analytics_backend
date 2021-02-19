import AnalyticsService from "../../service/analytics-service";

class Service extends AnalyticsService {
  getProfessions(search?: string, ordering?: string) {
    return this.get('/api/professions/without_pagination')
  }
  getEducationalPrograms(professionIds: Array<number>) {
    return this.post('/api/EducationalProgram/byprofessions', {
      professions_array: professionIds,
      range_set: 'work_program'
    })
  }
}

export const service = new Service();