import userRoutes from './users.js'
import authRoutes from './auth.js'
import commentRoutes from './comments.js'
import likeRoutes from './likes.js'
import postRoutes from './posts.js'
import relationshipRoutes from './relationships.js'

function route(app) {
    app.use('/api/users',userRoutes);
    app.use('/api/auth',authRoutes);
    app.use('/api/likes',likeRoutes);
    app.use('/api/comments',commentRoutes);
    app.use('/api/posts',postRoutes);
    app.use('/api/relationships', relationshipRoutes);
}

export default route;