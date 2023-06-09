"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacanciesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const vacancies_model_1 = require("./vacancies.model");
const jwt_1 = require("@nestjs/jwt");
const users_company_service_1 = require("../users-company/users-company.service");
let VacanciesService = class VacanciesService {
    constructor(vacancyRepository, jwtService, userCompanyService) {
        this.vacancyRepository = vacancyRepository;
        this.jwtService = jwtService;
        this.userCompanyService = userCompanyService;
    }
    async createVacancy(vacancyDto, req) {
        const user = await this.userCompanyService.getUserCompanyByRequest(req);
        vacancyDto.userCompanyId = user.id;
        const vacancy = await this.vacancyRepository.create(Object.assign({}, vacancyDto));
        return this.generateToken(vacancy);
    }
    async generateToken(vacancy) {
        const payload = { id: vacancy.id, email: vacancy.email, name: vacancy.nameVacancy, author: vacancy.author };
        return {
            token: this.jwtService.sign(payload)
        };
    }
    async getAllVacancies() {
        const vacancies = await this.vacancyRepository.findAll({ include: { all: true } });
        return vacancies;
    }
    async deleteVacancy(id) {
        return await this.vacancyRepository.destroy({ where: { id: id } });
    }
    async updateVacancy(id, updateVacancyDto) {
        const vacancy = await this.vacancyRepository.update(updateVacancyDto, { where: { id }, returning: true });
        return vacancy;
    }
};
VacanciesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(vacancies_model_1.Vacancy)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        users_company_service_1.UsersCompanyService])
], VacanciesService);
exports.VacanciesService = VacanciesService;
//# sourceMappingURL=vacancies.service.js.map