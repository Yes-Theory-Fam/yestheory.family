import {Service} from 'typedi';
import {GhostCheckCron} from '../../features/buddy-project/cron-jobs/ghost-check-cron';
import {MatchingCron} from '../../features/buddy-project/cron-jobs/matching-cron';

@Service()
export class CronStartSideEffect {
  constructor(
    private matchingCron: MatchingCron,
    private ghostCheckCron: GhostCheckCron,
  ) {}
}
