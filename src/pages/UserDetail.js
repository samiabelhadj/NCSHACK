import { useParams } from "react-router-dom";

const UserDetail = () => {
    const { id } = useParams();
    return (
        <div>
            <h1 className="text-3xl font-bold">User Detail</h1>
            <p className="mt-4">This is the detail page for user {id}.</p>
        </div>
    );
};

export default UserDetail; 