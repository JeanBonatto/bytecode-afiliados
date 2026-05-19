import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID, IsBoolean, Min, Max, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateItemDTO {
  @IsUUID('4', { message: 'idPlataforma deve ser um UUID válido' })
  @IsNotEmpty()
  idPlataforma: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  idItemPlataforma?: string;

  @IsNotEmpty({ message: 'Nome do item é obrigatório' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  nomeItem: string;

  @IsOptional()
  @IsString()
  descItem?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  valorItem: number;

  @IsOptional()
  @IsString()
  linkItem?: string;

  @IsOptional()
  @IsString()
  linkAfiliado?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  vendedor?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(5)
  @Type(() => Number)
  valorAvaliacao?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  itemsVendidos?: number;

  @IsOptional()
  @IsBoolean()
  entregaFull?: boolean;
}

export class UpdateItemDTO extends PartialType(CreateItemDTO) {}

export class PaginationQueryDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  search?: string;
}