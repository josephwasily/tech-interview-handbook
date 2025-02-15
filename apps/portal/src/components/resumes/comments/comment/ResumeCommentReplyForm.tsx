import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { ResumesSection } from '@prisma/client';
import { Button, TextArea } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';

import { trpc } from '~/utils/trpc';

type ResumeCommentEditFormProps = {
  parentId: string;
  resumeId: string;
  section: ResumesSection;
  setIsReplyingComment: (value: boolean) => void;
};

type IReplyInput = {
  description: string;
};

export default function ResumeCommentReplyForm({
  parentId,
  setIsReplyingComment,
  resumeId,
  section,
}: ResumeCommentEditFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm<IReplyInput>({
    defaultValues: {
      description: '',
    },
  });
  const { event: gaEvent } = useGoogleAnalytics();

  const trpcContext = trpc.useContext();
  const commentReplyMutation = trpc.useMutation('resumes.comments.user.reply', {
    onSuccess: () => {
      // Comment updated, invalidate query to trigger refetch
      trpcContext.invalidateQueries(['resumes.comments.list']);
    },
  });

  const onCancel = () => {
    reset({ description: '' });
    setIsReplyingComment(false);
  };

  const onSubmit: SubmitHandler<IReplyInput> = async (data) => {
    return commentReplyMutation.mutate(
      {
        parentId,
        resumeId,
        section,
        ...data,
      },
      {
        onSuccess: () => {
          setIsReplyingComment(false);

          gaEvent({
            action: 'resumes.comment_reply',
            category: 'engagement',
            label: 'Reply comment',
          });
        },
      },
    );
  };

  const setFormValue = (value: string) => {
    setValue('description', value.trim(), { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-column space-y-2 pt-2">
        <TextArea
          {...(register('description', {
            required: 'Reply cannot be empty!',
          }),
          {})}
          defaultValue=""
          disabled={commentReplyMutation.isLoading}
          errorMessage={errors.description?.message}
          label=""
          placeholder="Leave your reply here"
          onChange={setFormValue}
        />

        <div className="flex-row space-x-2">
          <Button
            disabled={commentReplyMutation.isLoading}
            label="Cancel"
            size="sm"
            variant="tertiary"
            onClick={onCancel}
          />

          <Button
            disabled={!isDirty || commentReplyMutation.isLoading}
            isLoading={commentReplyMutation.isLoading}
            label="Confirm"
            size="sm"
            type="submit"
            variant="primary"
          />
        </div>
      </div>
    </form>
  );
}
