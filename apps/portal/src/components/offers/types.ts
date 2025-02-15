import type { JobType } from '@prisma/client';

import type { MonthYear } from '~/components/shared/MonthYearPicker';

import type { Location } from '~/types/offers';

export type OffersProfilePostData = {
  background: BackgroundPostData;
  id?: string;
  offers: Array<OfferPostData>;
};

export type OffersProfileFormData = {
  background: BackgroundPostData;
  id?: string;
  offers: Array<OfferFormData>;
};

export type BackgroundPostData = {
  educations: Array<EducationPostData>;
  experiences: Array<ExperiencePostData>;
  id?: string;
  specificYoes: Array<SpecificYoePostData>;
  totalYoe: number;
};

type ExperiencePostData = {
  cityId?: string | null;
  cityName?: string | null;
  companyId?: string | null;
  companyName?: string | null;
  durationInMonths?: number | null;
  id?: string;
  jobType?: string | null;
  level?: string | null;
  monthlySalary?: Money | null;
  title?: string | null;
  totalCompensation?: Money | null;
  totalCompensationId?: string | null;
};

type EducationPostData = {
  endDate?: Date | null;
  field?: string | null;
  id?: string;
  school?: string | null;
  startDate?: Date | null;
  type?: string | null;
};

type SpecificYoePostData = {
  domain: string;
  id?: string;
  yoe: number;
};

type SpecificYoe = SpecificYoePostData;

export type OfferPostData = {
  cityId: string;
  cityName?: string;
  comments: string;
  companyId: string;
  companyName?: string;
  id?: string;
  jobType: JobType;
  monthYearReceived: Date;
  negotiationStrategy: string;
  offersFullTime?: OfferFullTimePostData | null;
  offersIntern?: OfferInternPostData | null;
};

export type OfferFormData = Omit<OfferPostData, 'monthYearReceived'> & {
  monthYearReceived: MonthYear;
};

export type OfferFullTimePostData = {
  baseSalary: Money | null;
  bonus: Money | null;
  id?: string;
  level: string;
  stocks: Money | null;
  title: string;
  totalCompensation: Money;
};

export type OfferInternPostData = {
  id?: string;
  internshipCycle: string;
  monthlySalary: Money;
  startYear: number;
  title: string;
};

export type Money = {
  currency: string;
  id?: string;
  value: number;
};

export type EducationDisplayData = {
  endDate?: string | null;
  field?: string | null;
  school?: string | null;
  startDate?: string | null;
  type?: string | null;
};

export type OfferDisplayData = {
  base?: string | null;
  bonus?: string | null;
  companyName?: string | null;
  duration?: number | null;
  id?: string;
  jobLevel?: string | null;
  jobTitle?: string | null;
  jobType?: JobType;
  location?: Location | null;
  monthlySalary?: string | null;
  negotiationStrategy?: string | null;
  otherComment?: string | null;
  receivedMonth?: string | null;
  stocks?: string | null;
  totalCompensation?: string | null;
};

export type BackgroundDisplayData = {
  educations: Array<EducationDisplayData>;
  experiences: Array<OfferDisplayData>;
  profileName: string;
  specificYoes: Array<SpecificYoe>;
  totalYoe: number;
};

export type CommentEntity = {
  createdAt: Date;
  id: string;
  message: string;
  profileId: string;
  replies?: Array<CommentEntity>;
  replyingToId: string;
  userId: string;
  username: string;
};
