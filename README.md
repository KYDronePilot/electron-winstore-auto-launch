# @kydronepilot/electron-winstore-auto-launch

This is a fork of `electron-winstore-auto-launch` by Felix Rieseberg. It has the
modifications:

- All functions except `getStartupTask` have been eliminated to simplify things.
- The task name must be passed to `getStartupTask`, to make sure the library is
  getting the right task.
- Updated to the Fall Creators Update (Redstone 3) Windows SDK.

## Example usage

```typescript
import { WindowsStoreAutoLaunch, StartupTaskState } from 'electron-winstore-auto-launch';

async function configureStartOnLogin(shouldStart: boolean) {
    // Returns the task specified if it exists, else undefined
    const task = await WindowsStoreAutoLaunch.getStartupTask('taskID')

    if (task !== undefined) {
        if (task.state !== StartupTaskState.disabledByUser) {
            if (task.state === StartupTaskState.disabled && shouldStart) {
                task.requestEnableAsync((error, result) => {
                    if (error)
                      throw new Error()
                })
            } else if (task.state === StartupTaskState.enabled && !shouldStart) {
                task.disable()
            }
        }
    }
}
```

For more info, visit the [original
repository](https://github.com/felixrieseberg/electron-winstore-auto-launch) by
Felix Rieseberg.

## License

MIT, please see `LICENSE` for details.
