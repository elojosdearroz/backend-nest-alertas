import {IsIn, IsString,IsArray, IsNumber, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { ReportTypes } from "../enums/report-type.enum";
import type { ReportType } from "../enums/report-type.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Report } from "../entities/report.entity";

export class CreateReportRequest {
    @ApiProperty()
    @IsIn(Object.values(ReportTypes))
    type: ReportType ;

    @ApiProperty()
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    coordinates: number[];

    @ApiProperty()
    @IsString()
    user: string

    toReport(): Report{
        const report = new Report();
        report.type = this.type
        report.location = {
            type: "Point",
            coordinates: this.coordinates
        }
        return report
    }
}