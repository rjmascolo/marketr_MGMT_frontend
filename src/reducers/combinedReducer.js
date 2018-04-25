import { combineReducers } from 'redux';
import { revisionItemsReducer, commentsReducer, deliverablesReducer, usersReducer, companiesReducer, campaignsReducer, notificationsReducer  } from './HelperReducer.js'


export const rootReducer = combineReducers({
  loggedin: loggedinReducer,
  user: userReducer,
  projects: projectsReducer,
  company: companiesReducer,
  campaigns: campaignsReducer,
  users: usersReducer
});

function userReducer(state = false, action) {
  switch (action.type) {

    case "FETCH_USER":
      return action.user;

    case  "LOGOUT_USER":
      return false

    default:
      return state;
  }
}

function loggedinReducer(state = false, action) {
  switch (action.type) {

     case "FETCH_USER":
      return true;

    default:
      return state;
  }
}

function projectsReducer(state = [], action) {
  let projectIndex;
  let newProject;
  let newDeliverables;
  let newUsers;
  let newRevisions;
  let newNotifications;

  switch (action.type) {

    case "ADD_PROJECT":
      return [ ... state, action.project];

    case "REMOVE_PROJECT":
      return state;

    case "FETCH_USER":
      return action.projects

    case "UPDATE_PROJECT_DETAILS":
      projectIndex = state.findIndex(project => project.id === action.project.id);
      newProject = action.project;

      return [...state.slice(0, projectIndex), newProject, ...state.slice(projectIndex + 1) ]

    case 'UPDATE_DELIVERABLE':
      projectIndex = state.findIndex(project => project.id === action.deliverable.project_id);
      newDeliverables = deliverablesReducer(state[projectIndex].deliverables, action);
      return [
          ...state.slice(0, projectIndex),
          { ...state[projectIndex], deliverables: newDeliverables },
          ...state.slice(projectIndex + 1)
        ]

    case "UPDATE_PROJECT_USERS":
      projectIndex = state.findIndex(project => project.id === action.users.project_id);
      newUsers = usersReducer(state[projectIndex].get_users, action);
      return [
          ...state.slice(0, projectIndex),
          { ...state[projectIndex], get_users: newUsers },
          ...state.slice(projectIndex + 1)
        ]

    case "ADD_REVISION":
      projectIndex = state.findIndex(project => project.id === action.revision.revision.project_id);
      newRevisions = revisionsReducer(state[projectIndex].revisions, action);
      newNotifications = notificationsReducer(state[projectIndex].notifications, action)
      return [
          ...state.slice(0, projectIndex),
          { ...state[projectIndex], revisions: newRevisions, notifications: newNotifications},
          ...state.slice(projectIndex + 1)
        ]

    case "ADD_REVISION_ITEM":
    case "DELETE_REVISION_ITEM":
      projectIndex = state.findIndex(project => project.id === action.item.project_id);
      newRevisions = revisionsReducer(state[projectIndex].revisions, action);
      newNotifications = notificationsReducer(state[projectIndex].notifications, action)
      return [
          ...state.slice(0, projectIndex),
          { ...state[projectIndex], revisions: newRevisions, notifications: newNotifications},
          ...state.slice(projectIndex + 1)
        ]

    case "ADD_COMMENT":
    case "DELETE_COMMENT":
    case "UPDATE_COMMENT":
      projectIndex = state.findIndex(project => project.id === action.comment.project_id);
      newRevisions = revisionsReducer(state[projectIndex].revisions, action);
      newNotifications = notificationsReducer(state[projectIndex].notifications, action)
      return [
          ...state.slice(0, projectIndex),
          { ...state[projectIndex], revisions: newRevisions, notifications: newNotifications},
          ...state.slice(projectIndex + 1)
        ]

    default:
      return state;
  }
}

function revisionsReducer(state, action) {

  let revisionIndex;
  let newRevisionItems;

  switch (action.type) {

  case "ADD_REVISION":
    return [...state, {...action.revision.revision, comments:[], revision_items:[]}]
  case "DELETE_COMMENT":
    revisionIndex = state.findIndex(revision => revision.id === action.comment.revision_id);
    newRevisionItems = commentsReducer(state[revisionIndex].comments, action);
    return [
        ...state.slice(0, revisionIndex),
        { ...state[revisionIndex], comments: newRevisionItems },
        ...state.slice(revisionIndex + 1)
      ]
  case "DELETE_REVISION_ITEM":
  revisionIndex = state.findIndex(revision => revision.id === action.item.revision_id);
  newRevisionItems = revisionItemsReducer(state[revisionIndex].revision_items, action);
  return [
      ...state.slice(0, revisionIndex),
      { ...state[revisionIndex], revision_items: newRevisionItems },
      ...state.slice(revisionIndex + 1)
    ]
  case "ADD_REVISION_ITEM":
    revisionIndex = state.findIndex(revision => revision.id === action.item.item.revision_id);
    newRevisionItems = revisionItemsReducer(state[revisionIndex].revision_items, action);
    return [
        ...state.slice(0, revisionIndex),
        { ...state[revisionIndex], revision_items: newRevisionItems },
        ...state.slice(revisionIndex + 1)
      ]
  case "ADD_COMMENT":
      revisionIndex = state.findIndex(revision => revision.id === action.comment.comment.revision_id);
      newRevisionItems = commentsReducer(state[revisionIndex].comments, action);
      return [
          ...state.slice(0, revisionIndex),
          { ...state[revisionIndex], comments: newRevisionItems },
          ...state.slice(revisionIndex + 1)
        ]
  case "UPDATE_COMMENT":
    revisionIndex = state.findIndex(revision => revision.id === action.comment.revision_id);
    newRevisionItems = commentsReducer(state[revisionIndex].comments, action);
    return [
        ...state.slice(0, revisionIndex),
        { ...state[revisionIndex], comments: newRevisionItems },
        ...state.slice(revisionIndex + 1)
      ]
  }
}
