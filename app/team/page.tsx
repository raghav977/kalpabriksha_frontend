'use client';

import { Layout } from '@/components/layout/Layout';
import { TeamHero, TeamList, TeamCTA } from '@/components/team';

export default function TeamPage() {
  return (
    <Layout>
      <TeamHero />
      <TeamList />
      <TeamCTA />
    </Layout>
  );
}
