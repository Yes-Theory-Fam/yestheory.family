import { Container, Service } from "typedi";
import { MatchingCron } from "../../features/buddy-project/cron-jobs/matching-cron";
import { GhostCheckCron } from "../../features/buddy-project/cron-jobs/ghost-check-cron";

@Service()
class CronStartSideEffect {
  constructor(
    private matchingCron: MatchingCron,
    private ghostCheckCron: GhostCheckCron
  ) {}
}

Container.get(CronStartSideEffect);
