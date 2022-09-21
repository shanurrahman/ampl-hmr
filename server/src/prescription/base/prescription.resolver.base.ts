/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreatePrescriptionArgs } from "./CreatePrescriptionArgs";
import { UpdatePrescriptionArgs } from "./UpdatePrescriptionArgs";
import { DeletePrescriptionArgs } from "./DeletePrescriptionArgs";
import { PrescriptionFindManyArgs } from "./PrescriptionFindManyArgs";
import { PrescriptionFindUniqueArgs } from "./PrescriptionFindUniqueArgs";
import { Prescription } from "./Prescription";
import { User } from "../../user/base/User";
import { PrescriptionService } from "../prescription.service";

@graphql.Resolver(() => Prescription)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class PrescriptionResolverBase {
  constructor(
    protected readonly service: PrescriptionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Prescription",
    action: "read",
    possession: "any",
  })
  async _prescriptionsMeta(
    @graphql.Args() args: PrescriptionFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Prescription])
  @nestAccessControl.UseRoles({
    resource: "Prescription",
    action: "read",
    possession: "any",
  })
  async prescriptions(
    @graphql.Args() args: PrescriptionFindManyArgs
  ): Promise<Prescription[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Prescription, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Prescription",
    action: "read",
    possession: "own",
  })
  async prescription(
    @graphql.Args() args: PrescriptionFindUniqueArgs
  ): Promise<Prescription | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Prescription)
  @nestAccessControl.UseRoles({
    resource: "Prescription",
    action: "create",
    possession: "any",
  })
  async createPrescription(
    @graphql.Args() args: CreatePrescriptionArgs
  ): Promise<Prescription> {
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        doctor: args.data.doctor
          ? {
              connect: args.data.doctor,
            }
          : undefined,

        patient: args.data.patient
          ? {
              connect: args.data.patient,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Prescription)
  @nestAccessControl.UseRoles({
    resource: "Prescription",
    action: "update",
    possession: "any",
  })
  async updatePrescription(
    @graphql.Args() args: UpdatePrescriptionArgs
  ): Promise<Prescription | null> {
    try {
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          doctor: args.data.doctor
            ? {
                connect: args.data.doctor,
              }
            : undefined,

          patient: args.data.patient
            ? {
                connect: args.data.patient,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Prescription)
  @nestAccessControl.UseRoles({
    resource: "Prescription",
    action: "delete",
    possession: "any",
  })
  async deletePrescription(
    @graphql.Args() args: DeletePrescriptionArgs
  ): Promise<Prescription | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async doctor(@graphql.Parent() parent: Prescription): Promise<User | null> {
    const result = await this.service.getDoctor(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async patient(@graphql.Parent() parent: Prescription): Promise<User | null> {
    const result = await this.service.getPatient(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
