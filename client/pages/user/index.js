import axios from 'axios'
import {useEffect, useState, useContext} from 'react'
import {Context} from '../../context'

const UserIndex = () => {
    const [hidden, setHidden] = useState(true);
    const {state: { user }} = useContext(Context);

    const fetchUser = async() => {
        try {
            const {data} = await axios.get('/api/current-user');
            console.log(data)
            setHidden(false);
        } catch (err) {
            console.log(err)
            setHidden(true)
        }
    }
    
    useEffect(() => {
        fetchUser()
    }, [])

    

    return (
        <h1 className="jumbotron text-center">{user.name}</h1>
    )
}

export default UserIndex;