import { api, eraseAuth } from '../../services';

export async function logoutUser ()
{
    eraseAuth();
}