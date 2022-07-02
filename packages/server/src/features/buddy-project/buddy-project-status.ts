import { Field, ObjectType, registerEnumType } from "type-graphql";
import { BuddyProjectEntry } from "../../__generated__/type-graphql";

export enum BuddyProjectStatus {
  NOT_SIGNED_UP = "NOT_SIGNED_UP",
  SIGNED_UP = "SIGNED_UP",
  MATCHED = "MATCHED",
}

registerEnumType(BuddyProjectStatus, { name: "BuddyProjectStatus" });

@ObjectType()
export class BuddyProjectStatusPayload {
  @Field(() => BuddyProjectStatus)
  status: BuddyProjectStatus;

  @Field(() => BuddyProjectEntry, { nullable: true })
  buddy?: BuddyProjectEntry | null;

  constructor(status: BuddyProjectStatus, buddy?: BuddyProjectEntry | null) {
    this.status = status;
    this.buddy = buddy;
  }
}
