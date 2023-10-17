import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { Button } from '@nextui-org/button';
import { UserPlus2 } from 'lucide-react';
import { signIn } from 'next-auth/react';


interface FollowButton {
    followingId: string;
    hideIcon?: boolean;
    viewer: {
        hasFollowed: boolean;
    };
}

export default function FollowButton({
    followingId,
    viewer
}: FollowButton) {
    const { data: sessionData } = useSession();
    const [ userChoice, setUserChoice ] = useState({
        following: viewer.hasFollowed,
    }); 

    const addFollowMutation = api.user.addFollow.useMutation();
    const handleFollow = (input: {followingId: string, followerId: string}) => {
        if (userChoice.following) {
            setUserChoice({ following: false });
        } else {
            setUserChoice({ following: true });
        }
    
    addFollowMutation.mutate(input);
};


    return (<>
    <Button 
    variant="shadow"
    radius="full"
    size="sm"
    color={userChoice.following ? "danger" : "default"}
    onClick={
        sessionData ?
        () => handleFollow({
            followingId: followingId,
            followerId: sessionData ? sessionData.user.id : ""
        })
        : () => void signIn()
    } className="flex"> 
    {userChoice.following? [<UserPlus2 className="shrink-0 w-5 h-5  " key="icon" />, <span key="text">Following</span>] : [<UserPlus2 className="shrink-0 w-5 h-5  " key="icon" />, <span key="text">Follow</span>]}
</Button>
    
    </>); 
}