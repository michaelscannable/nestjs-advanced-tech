import { Injectable, Type } from '@nestjs/common';
// import { EventStore } from './ports/event-store';
import { EventPublisher } from '@nestjs/cqrs';
import { EventStore } from 'src/alarms/application/ports/event-store';
import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';
// import { VersionedAggregateRoot } from '../domain/aggregate-root';

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async rehydrate<T extends VersionedAggregateRoot>(
    aggregateId: string,
    AggregateCls: Type<T>,
  ): Promise<T> {
    const events = await this.eventStore.getEventsByStreamId(aggregateId);

    const AggregateClsWithDispatcher =
      this.eventPublisher.mergeClassContext(AggregateCls);
    const aggregate = new AggregateClsWithDispatcher(aggregateId);

    aggregate.loadFromHistory(events as SerializableEvent<any>[]);
    return aggregate;
  }
}
