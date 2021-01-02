export enum StartupTaskState {
    disabled,
    disabledByUser,
    enabled,
}

export interface StartupTask {
    state: StartupTaskState
    taskId: String

    requestEnableAsync(callback: (error: Error, result: StartupTaskState) => void): void
    disable(): void
}

export class WindowsStoreAutoLaunch {
    /**
     * Returns the windows.applicationModel namespace for this model. If the app is not
     * running inside an appx container, this will fail.
     *
     * @returns windows.applicationModel namespace
     */
    private static getAppModel(): any {
        if (process.platform !== 'win32') {
            throw new Error('Platform is not win32')
        }
        return require('@nodert-win10-rs3/windows.applicationmodel')
    }

    /**
     * Returns the specified startupTask.
     *
     * @param taskId - ID of the task to fetch
     * @returns The task if one exists
     */
    static async getStartupTask(taskId: string): Promise<StartupTask | undefined> {
        return new Promise((resolve, reject) => {
            const appModel = WindowsStoreAutoLaunch.getAppModel()
            appModel.StartupTask.getAsync(taskId, (error: Error, task: StartupTask) => {
                if (error) {
                    return reject(error)
                }
                if (task) {
                    return resolve(task)
                }
                return resolve(undefined)
            })
        })
    }
}
