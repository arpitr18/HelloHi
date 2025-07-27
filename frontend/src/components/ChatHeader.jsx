import { X } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";

const ChatHeader = () => {
	const { selectedUser, setSelectedUser } = useChatStore();
	const { onlineUsers } = useAuthStore();

	// A "guard clause" to prevent the component from crashing if no user is selected.
	if (!selectedUser) {
		return null;
	}

	const isOnline = onlineUsers.includes(selectedUser._id);

	return (
		<div className='flex items-center justify-between p-3 border-b border-base-300 bg-base-200'>
			{/* User Info Section */}
			<div className='flex items-center gap-4'>
				{/* Avatar with Online Status Indicator */}
				<div className='avatar relative'>
					<div className='w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
						<img
							src={selectedUser.profile || "/user.png"}
							alt={`${selectedUser.fullName}'s profile picture`}
						/>
					</div>
					{/* Online Status Dot with Tooltip */}
					<div
						className='tooltip tooltip-right'
						data-tip={isOnline ? "Online" : "Offline"}
					>
						<span
							className={`absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full border-2 border-base-200 ${
								isOnline ? "bg-green-500" : "bg-gray-400"
							}`}
						/>
					</div>
				</div>

				{/* Name and Status Text */}
				<div>
					<h3 className='font-bold text-lg text-base-content'>
						{selectedUser.fullName}
					</h3>
					<p
						className={`text-sm font-medium ${
							isOnline ? "text-green-500" : "text-base-content/60"
						}`}
					>
						{isOnline ? "Online" : "Offline"}
					</p>
				</div>
			</div>

			{/* Close Button with Tooltip */}
			<div className='tooltip tooltip-bottom' data-tip='Close chat'>
				<button
					onClick={() => setSelectedUser(null)}
					className='btn btn-ghost btn-circle'
					aria-label='Close chat'
				>
					<X size={24} />
				</button>
			</div>
		</div>
	);
};
export default ChatHeader;