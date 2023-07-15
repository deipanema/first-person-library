import { Comment } from '../../types';
import ErrorScreen from '../ErrorScreen';
import LoadingSpinner from '../LoadingSpinner';
import CommentCard from '../UI/Card/CommentCard';
import Icon from '../UI/Icon';

type CommentsProps = {
  isLoading: boolean;
  isError: boolean;
  comments: Comment[];
  headline: string;
  keyword?: string;
};

export default function Comments({
  isLoading,
  isError,
  comments,
  headline,
  keyword = '',
}: CommentsProps) {
  return (
    <section>
      <h2 className="font-bold text-xl md:text-2xl lg:text-4xl my-5 md:my-9 lg:my-20 text-center">
        {headline}
      </h2>
      <div>
        {isLoading || isError ? (
          <div className="h-screen">
            {isLoading && <LoadingSpinner />}
            {isError && <ErrorScreen />}
          </div>
        ) : (
          <>
            {comments?.length === 0 ? (
              <div className="flex flex-col items-center">
                <Icon
                  src="/icon/comments.png"
                  alt="등록된 코멘트가 없습니다."
                  className="h-5 md:h-11"
                />
                <p className="mt-6 text-base md:text-xl text-light-gray">
                  등록된 {`${keyword} `}코멘트가 없습니다.
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 mb:gap-4 lg:gap-6 mx-auto">
                  {comments?.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
