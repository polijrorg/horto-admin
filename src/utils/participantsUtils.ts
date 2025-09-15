import { GetParticipantsResponse } from '../interfaces/Events';

export function formatParticipants(
    participants: GetParticipantsResponse[],
    field: keyof GetParticipantsResponse['user'],
    separator = ',',
    onePerLine = false
): string {
    const values = participants.map((p) => p.user[field]);

    if (onePerLine) {
        return values.join('\n');
    }

    return values.join(separator);
}
