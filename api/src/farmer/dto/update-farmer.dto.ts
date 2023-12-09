import { OmitType } from '@nestjs/mapped-types';
import { CreateFarmerDto } from './create-farmer.dto';

export class UpdateFarmerDto extends OmitType(CreateFarmerDto, ['created_by']) {}
