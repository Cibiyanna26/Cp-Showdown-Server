

const apiUrl = 'https://leetcode.com/graphql';

const getProfileData = async(username) => {
    const query = {
        query: `
            query userPublicProfile($username: String!) {
              matchedUser(username: $username) {
                contestBadge {
                  name
                  expired
                  hoverText
                  icon
                }
                username
                profile {
                  ranking
                  userAvatar
                  realName
                  skillTags
                }
              }
            }`,
        variables: { username }
    };
    try{
        const response = await fetch(`${apiUrl}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(query)
            }
        );
        console.log('res camse\n')
        const data = await response.json();
        if(data.errors!=null) {
            data.errors.forEach(element => {
                console.log(element.message)
            });
        }
        else console.log(data.data.matchedUser)
    }catch(error){
        console.log('Error : ',error);
    }
}

getProfileData('DharunAP');