

const apiUrl = 'https://leetcode.com/graphql';

const getProfileData = async(username) => {
    const query = {
        query: `
            query userPublicProfile($username: String!) {
              matchedUser(username: $username) {
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
        const data = await response.json();
        if(data.errors!=null) {
            return {
                status: 404,
                message: data.errors[0].message
            }
        }
        else {
            return {
                status : 200,
                message: "Profile fetched sucessfully",
                data : data.data.matchedUser
            }
        }
    }catch(error){
        return {
            status : 500,
            message: "Internal Server Error",
            error : error
        }
    }
}

const getProblemSolved = async(username) => {
    const query = {
        query:`
            query userProblemsSolved($username: String!) {
            allQuestionsCount {
                difficulty
                count
            }
            matchedUser(username: $username) {
                problemsSolvedBeatsStats {
                difficulty
                percentage
                }
                submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
                }
            }
            }
        `,
        variables: { username }
    };
    try{
        const response = await fetch(apiUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(query)
        });
        const data = await response.json();
        return {
            status : 200,
            message: "Data fetched sucessfully",
            data : data.data
        }
    }
    catch(error){
        return {
            status : 500,
            message: "Internal server error"
        }
    }
}

const getLangStats = async(username) => {
    const query = {
        query: `
            query languageStats($username: String!) {
                matchedUser(username: $username) {
                    languageProblemCount {
                    languageName
                    problemsSolved
                    }
                }
            }
        `,
        variables : {username}
    };
    try{
        const response = await fetch(apiUrl, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(query)
        });
        const data = await response.json();
        return {
            status : 200,
            message: 'Data fetched sucessfully',
            data : data.data.matchedUser
        }
    }catch(error){
        return {
            status : 500,
            message: 'Internal server error'
        }
    }
}

const getSkillStats = async(username) => {
    const query = {
        query : `
        query skillStats($username: String!) {
            matchedUser(username: $username) {
                tagProblemCounts {
                advanced {
                    tagName
                    tagSlug
                    problemsSolved
                }
                intermediate {
                    tagName
                    tagSlug
                    problemsSolved
                }
                fundamental {
                    tagName
                    tagSlug
                    problemsSolved
                }
                }
            }
            }
        `,
        variables : { username }
    };
    try{
        const response = await fetch(apiUrl,{
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(query)
        });
        const data = await response.json();
        return {
            status : 200,
            message: 'Data fetched sucessfully',
            data : data.data.matchedUser
        }
    }catch(error){
        return {
            status : 500,
            message: 'Internal server error'
        }
    }
}

/*
(async()=>{
    const values = await getSkillStats('DharunAP');
    console.log(values.data)
})();
*/

/*
(async () => {
    let values = await getLangStats('DharunAP');
    console.log(values.data)
})();
*/

/*
(async () => {
    let values = await getProblemSolved('DharunAP');
    console.log(values)
})();
*/

/*
(async () => {
    let values = await getProfileData('DharunAP');
    console.log(values);
    // {
    //     status: 200,
    //     message: 'Profile fetched sucessfully',
    //     data: {
    //       username: 'DharunAP',
    //       profile: {
    //         ranking: 86718,
    //         userAvatar: 'https://assets.leetcode.com/users/DharunAP/avatar_1732074291.png',
    //         realName: 'Dharun A P',
    //         skillTags: [Array]
    //       }
    //     }
    //   }
})();
*/
