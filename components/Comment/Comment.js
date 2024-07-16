import { useContext, useState } from 'react';
import React from 'react';
import { formatDate, isEditing, isReplying } from '../../utils';
import Avatar from '../Avatar/Avatar';
import { ReplyButton } from './ReplyButton';
import { EditCommentButton } from './EditComment/EditCommentButton';
import { ClapComment } from './ClapComment/ClapComment';
import { EditComment } from './EditComment/EditComment';
import { NewComment } from './NewComment/NewComment';
import { DeleteComment } from './DeleteComment/DeleteComment';
import { CommentContext } from './Comments';
import styles from './Comments.module.css';

const Comment = ({ comment, replies, parentId = null, currentUserId }) => {
  const { activeComment } = useContext(CommentContext);
  const [showModal, setShowModal] = useState(false);
  const createdAt = formatDate(comment.date);
  return (
    <>
      <div className={styles.comment}>
        <div className={styles.content}>
          <div className={styles.meta}>
            <Avatar
              className='avatar--comment'
              src='http://res.cloudinary.com/drkvr9wta/image/upload/v1646902511/on6rtgquch9z5sbguuer.jpg'
              link={`/users/${comment.author.id}`}
            />
            <div>
              <div className={styles.author}>Quincy Larson</div>
              <div className={styles.date}>{createdAt}</div>
            </div>
          </div>

          {!isEditing(activeComment, comment.id) ? (
            <div className={styles.body}>{comment.body}</div>
          ) : (
            <EditComment
              commentId={comment.id}
              commentBody={comment.body}
              setShowModal={setShowModal}
            />
          )}
        </div>
        <div className={`preview__reactions ${styles['preview__reactions']}`}>
          <div className='preview__reactions--left'>
            {/* <ClapComment
                claps={comment.claps}
                commentId={comment.id}
                setShowModal={setShowModal}
              />
              <ReplyButton
                currentUserId={currentUserId}
                comment={comment}
                setShowModal={setShowModal}
              /> */}
          </div>

          <div className='preview__reactions--right'>
            {/* <EditCommentButton
                currentUserId={currentUserId}
                commentId={comment.id}
                authorId={comment.author.id}
              />
              <DeleteComment
                commentId={comment.id}
                authorId={comment.author.id}
              /> */}
          </div>
        </div>
      </div>

      {isReplying(activeComment, comment.id) && (
        <NewComment
          styles={styles}
          replyId={parentId ? parentId : comment.id}
        />
      )}
      <div className='replies' style={{ marginLeft: '5rem' }}>
        {replies &&
          replies.length > 0 &&
          replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply._id}
              replies={[]}
              parentId={comment.id}
              currentUserId={currentUserId}
            />
          ))}
      </div>
    </>
  );
};

export default Comment;
