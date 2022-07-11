import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";
import { GhostService, MarkGhostedError } from "../services/ghost-service";

@Resolver(ResolverTarget.YESBOT)
class GhostMutations {
  constructor(private ghostService: GhostService) {}

  @Mutation(() => MarkGhostedPayload)
  async markGhosted(
    @Arg("userId") userId: string
  ): Promise<MarkGhostedPayload> {
    const result = await this.ghostService.markAsGhosted(userId);
    if ("error" in result) {
      return new MarkGhostedPayload(false, result.error, undefined);
    }

    return new MarkGhostedPayload(true, undefined, result.buddyId);
  }

  @Mutation(() => Boolean)
  async markAsNotGhosting(@Arg("userId") userId: string): Promise<boolean> {
    await this.ghostService.markAsNotGhosting(userId);

    return true;
  }
}

registerEnumType(MarkGhostedError, { name: "MarkGhostedError" });

@ObjectType()
class MarkGhostedPayload {
  @Field()
  public success: boolean;

  @Field(() => MarkGhostedError, { nullable: true })
  public error: MarkGhostedError | undefined;

  @Field(() => String, { nullable: true })
  public buddyId: string | undefined;

  constructor(
    success: boolean,
    error: MarkGhostedError | undefined,
    buddyId: string | undefined
  ) {
    this.success = success;
    this.error = error;
    this.buddyId = buddyId;
  }
}
