const CommentDetail = require('../CommentDetail');

describe('CommentDetail entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      id: '123',
      username: 'foobar',
    };

    // Action & Assert
    expect(() => new CommentDetail(payload)).toThrowError('COMMENT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload does not meet data type requirements', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'foobar',
      content: 'a comment',
      replies: 'some replies',
      date: 321,
      likeCount: 0,
    };

    // Action & Assert
    expect(() => new CommentDetail(payload)).toThrowError('COMMENT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create CommentDetail entities correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'foobar',
      content: 'a comment',
      replies: [
        {
          id: 'replies-1',
          username: 'johndoe',
          content: 'a reply',
          date: '2024-10-25',
        },
      ],
      date: '2024-10-26',
      likeCount: 0,
    };

    // Action
    const commentDetail = new CommentDetail(payload);

    // Assert
    expect(commentDetail).toBeInstanceOf(CommentDetail);
    expect(commentDetail.id).toEqual(payload.id);
    expect(commentDetail.username).toEqual(payload.username);
    expect(commentDetail.content).toEqual(payload.content);
    expect(commentDetail.replies).toEqual(payload.replies);
    expect(commentDetail.date).toEqual(payload.date);
  });

  it('should create deleted CommentDetail entities correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'foobar',
      content: 'a comment',
      replies: [
        {
          id: 'replies-1',
          username: 'johndoe',
          content: 'a reply',
          date: '2024-10-25',
        },
      ],
      date: '2024-10-26',
      likeCount: 0,
      is_delete: true,
    };

    // Action
    const commentDetail = new CommentDetail(payload);

    // Assert
    expect(commentDetail).toBeInstanceOf(CommentDetail);
    expect(commentDetail.id).toEqual(payload.id);
    expect(commentDetail.username).toEqual(payload.username);
    expect(commentDetail.content).toEqual('**komentar telah dihapus**');
    expect(commentDetail.replies).toEqual(payload.replies);
    expect(commentDetail.date).toEqual(payload.date);
  });
});
