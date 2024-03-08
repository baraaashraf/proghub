import { useParams } from "react-router-dom"

export const ViewPost = () => {
    const { id } = useParams()
    return <div>Viewwing post {id}</div>
}