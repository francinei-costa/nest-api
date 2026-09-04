import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class TagDto {
  @IsString({ message: 'O Campo nome da tag deve ser uma string' })
  @IsNotEmpty({ message: 'O Campo nome da tag não pode estar vazio' })
  readonly name!: string;
}

export class CreateCourseDto {
  @IsString({ message: 'O Campo nome deve ser uma string' })
  @IsNotEmpty({ message: 'O Campo nome não pode estar vazio' })
  readonly name!: string;

  @IsString({ message: 'O Campo descrição deve ser uma string' })
  @IsOptional()
  readonly description?: string;

  @IsArray({ message: 'O Campo tags deve ser um array' })
  @ArrayNotEmpty({ message: 'O Campo tags não pode estar vazio' })
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  readonly tags!: TagDto[];
}
