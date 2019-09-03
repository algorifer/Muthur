import { writable, derived, get } from 'svelte/store';

// Stores
import { projects } from './db';

export const viewMode = writable(`Tasks`);
export const message = writable(``);
export const projectsCount = writable(null);
export const tasksCount = writable(null);
export const newProject = writable({});

// Methods
export const updateProjectCount = () =>
  get(projects)
    .count()
    .then(res => {
      projectsCount.set(res);
      if (!res) message.set(`You need to create the first project`);
    });

// Events
export const toTasks = () => viewMode.set(`Tasks`);
export const toAddProject = name => {
  viewMode.set(`AddProject`);
  message.set(`create project`);
  if (name) newProject.set({ name });
};

export const setProjectField = (view, fieldName, value) => {
  switch (view) {
    case `AddProject`:
      newProject.update(p => ({ ...p, [fieldName]: value }));
      break;
  }
};
