import fetch from 'isomorphic-fetch';

const token = localStorage.getItem('token')

const API_URL = "http://localhost:3000/"
// const API_URL = "https://marketr-mgmt-backend.herokuapp.com/"

const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    Authorization: token
}

export function fetchUser(id) {
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_USERS_REQUEST' });
    return fetch(`${API_URL}users/${id}`)
      .then(response => response.json())
      .then(user => {
        if (user.status === 404 ) {
          return user
        } else {
        const newUser = Object.assign({id: user.id, first_name: user.first_name, last_name: user.last_name, position: user.position, company: user.company})
        const projects = user.projects;
        const campaigns = user.current_campaigns
        const company = user.company
        dispatch({ type: 'FETCH_USER', user: newUser, projects: projects, campaigns: campaigns, company: company })
        return campaigns[0].id
        }
       }
    );
  };
}

export function logOut() {
  localStorage.removeItem('token')
  return(dispatch)=> {
    dispatch({type:"LOGOUT_USER"})
  }
}

export const login = (username, password) => {
  return fetch(`${API_URL}auth`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({username, password }
    )
  }).then(res => res.json())
}

export const getCurrentUser = () => {
  return fetch(`${API_URL}current_user/`, {
    headers: headers } ).then(res => res.json())
}

export const createUser = (data) => {
  return (dispatch) => {
    return fetch(`${API_URL}users`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }).then(res => res.json())
  }
}

export const createRevisionAsset = (item, projectId) => {
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_REVISION_ITEM' });
    return fetch(`${API_URL}revision_items/`, {
      method:'POST',
      body: item
    })
      .then(response => response.json())
      .then(json => {
        const itemNew = Object.assign( json, {project_id: projectId});
        dispatch({ type: 'ADD_REVISION_ITEM', item: itemNew } );
      }
    );
  };
}

export const createRevision = (item) => {
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_REVISION' });
    return fetch(`${API_URL}revisions/`, {
      method:'POST',
      headers: headers,
      body:JSON.stringify(item)
    })
      .then(response => response.json())
      .then(revision => {
        dispatch({ type: 'ADD_REVISION', revision } );
      }
    );
  };
}

export const createComment = (comment, projectId) => {
  let commentWithProjectId = {...comment, project_id: projectId }
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_COMMENTS' });
    return fetch(`${API_URL}comments/`, {
      method:'POST',
      headers: headers,
      body:JSON.stringify( commentWithProjectId )
    })
      .then(response => response.json())
      .then(commentRails => {
        const comment = Object.assign( commentRails, { project_id: parseInt(projectId) })
        dispatch({ type: 'ADD_COMMENT', comment } );
      }
    );
  };
}

export const deleteComment = (commentId, revisionId, projectId) => {
  return (dispatch) => {
    dispatch({ type: 'START_DELETEING_COMMENTS' });
    return fetch(`${API_URL}comments/${commentId}`, {
      method:'DELETE',
      headers: headers,
    })
      .then(response => response.json())
      .then(commentRails => {
        const comment = {id: parseInt(commentId), revision_id: parseInt(revisionId), project_id: parseInt(projectId) }
        dispatch({ type: 'DELETE_COMMENT', comment } );
      }
    );
  };
}

export const createNewProject = (projectHash, userId) => {

  let projectData = {project: projectHash, user_id: userId}
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_PROJECTS' });
    return fetch(`${API_URL}projects/`, {
      method:'POST',
      headers: headers,
      body:JSON.stringify(projectData)
    })
      .then(response => response.json())
      .then(project => {
        project.revisions[0]["revision_items"] = []
        project.revisions[0]["comments"] = []
        debugger;
        dispatch({ type: 'ADD_PROJECT', project } );
        return project
      }
    );
  };
}

export const deleteFile = ( itemId, projectId ) => {
  return (dispatch) => {
    dispatch({ type: 'START_DELETEING_COMMENTS' });
    return fetch(`${API_URL}revision_items/${itemId}`, {
      method:'DELETE',
      headers: headers
    })
      .then(response => response.json())
      .then(freshItem => {
        let item = Object.assign( freshItem , {project_id: parseInt(projectId)} )
        dispatch({ type: 'DELETE_REVISION_ITEM', item } );
      }
    );
  };
}

export const updateDeliverable = (deliverable, projectId) => {
  let data;
  if (!deliverable.description) {
    data = {done: deliverable.done}
  } else {
    data = deliverable
  }
  return (dispatch) => {
    dispatch({ type: 'START_UPDATING_DELIVERABLE' });
    return fetch(`${API_URL}deliverables/${deliverable.id}`, {
      method:'PATCH',
      headers: headers,
      body:JSON.stringify( data )
    })
      .then(response => response.json())
      .then(deliverableRails => {
        const deliverable = Object.assign( deliverableRails , {project_id: parseInt(projectId)} )
        dispatch({ type: 'UPDATE_DELIVERABLE' , deliverable } );
      }
    );
  };
}

export const updateUsers = (projectUsers) => {
  return (dispatch) => {
    dispatch({ type: 'START_UPDATING_DELIVERABLE' });
    return fetch(`${API_URL}edit-project-users/${projectUsers.project_id}`, {
      method:'PATCH',
      headers: headers,
      body:JSON.stringify( projectUsers )
    })
      .then(response => response.json())
      .then( usersRails => {
        const users = Object.assign( usersRails , {project_id: projectUsers.project_id} )
        dispatch({ type: 'UPDATE_PROJECT_USERS' , users });
      }
    );
  };
}

export const updateProject = (project) => {
  return (dispatch) => {
    dispatch({ type: 'START_UPDATING_DELIVERABLE' });
    return fetch(`${API_URL}projects/${project.id}`, {
      method:'PATCH',
      headers: headers,
      body:JSON.stringify( project )
    })
      .then(response => response.json())
      .then( project => {
        dispatch({ type: 'UPDATE_PROJECT_DETAILS' , project });
      }
    );
  };
}

export const fetchCompanyData = (id) => {
  return (dispatch) => {
    dispatch({ type: 'START_UPDATING_DELIVERABLE' });
    return fetch(`${API_URL}companies/${id}`)
      .then(response => response.json())
      .then( company => {
        debugger;
        dispatch({ type: 'FETCH_COMPANY' , company });
      }
    );
  };
}

export const createCampaign = (data) => {
  return (dispatch) => {
    dispatch({ type: 'START_UPDATING_DELIVERABLE' });
    return fetch(`${API_URL}campaigns/`, {
      method:'POST',
      headers: headers,
      body:JSON.stringify(data)
    }).then(response => response.json())
      .then( campaign => {
        dispatch({ type: 'CREATE_CAMPAIGN' , campaign: campaign });
      }
    );
  };
}

export const getCampaignUsers = (id) => {
  return (dispatch) => {
    dispatch({ type: 'START_UPDATING_DELIVERABLE' });
    return fetch(`${API_URL}campaign-users/${id}`).then(response => response.json())
      .then( campaignUsers => {
        dispatch({ type: 'FETCH_CAMPAIGN_USERS' , users: campaignUsers });
      }
    );
  };
}
