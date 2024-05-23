import React from "react"
import Comment from "./ComicsComment"

function CommentsList({ comments, depth }) {
    if (comments) {
        return comments.map((comment) => (
            <Comment key={comment?.comment_id} {...comment} depth={depth} />
        ))
    }
    return null
}

export default CommentsList
