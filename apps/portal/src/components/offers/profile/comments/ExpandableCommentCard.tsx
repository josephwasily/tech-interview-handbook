import { useState } from 'react';

import CommentCard from '~/components/offers/profile/comments/CommentCard';

import type { Reply } from '~/types/offers';

type Props = Readonly<{
  comment: Reply;
  profileId: string;
  token?: string;
}>;

export default function ExpandableCommentCard({
  comment,
  profileId,
  token = '',
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <CommentCard
        comment={comment}
        handleExpanded={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        profileId={profileId}
        replyLength={comment.replies?.length ?? 0}
        token={token}
      />
      {comment.replies && comment.replies.length > 0 && isExpanded && (
        <div className="pt-4">
          <div className="border-l-4 border-slate-200 pl-4">
            <ul className="space-y-4" role="list">
              {comment.replies.map((reply) => (
                <li key={reply.id}>
                  <CommentCard
                    comment={reply}
                    disableReply={true}
                    profileId={profileId}
                    token={token}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
