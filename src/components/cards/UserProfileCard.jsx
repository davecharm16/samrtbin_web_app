import DefaultProfilePic from '../../assets/default-profilepic.jpg';

export default function UserProfileCard({ user }) {
    return (
        <div className="card bg-base-100 max-w-fit shadow max-h-fit mb-3">
            <div className="card-body items-center text-center">
                <div className="avatar mb-3">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                        <img src={user.profilePicture || DefaultProfilePic} alt={`${user.firstName} ${user.lastName}`} />
                    </div>
                </div>
                <h2 className="card-title text-3xl font-bold">
                    {user.firstName} {user.lastName}
                </h2>
                <p className="text-xl">{user.email}</p>
            </div>
        </div>
    );
}
