import { startProductSyncJob } from './ProductSyncJob';

export const startAllJobs = (): void => {
  startProductSyncJob();
};