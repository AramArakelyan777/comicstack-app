import React from "react"
import Comment from "./ThreadsComment"

function CommentsList({ comments }) {
    if (comments) {
        return comments.map((comment) => (
            <div key={comment?.comment_id}>
                <Comment {...comment} />
            </div>
        ))
    }
    return null
}

export default CommentsList
