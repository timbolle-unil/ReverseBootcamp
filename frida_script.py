import frida

# Attach to device and start app process
device = frida.get_usb_device()
pid = device.spawn(["com.cp.camera"])

# Attach to the app process
session = device.attach(pid)

# Open the JS script and load it inside the process
script = session.create_script(open("script_hook_final.js").read())
script.load()
device.resume(pid) # Resume a process from the attachable state

# Allow the script to run until the user press Enter
input()
device.kill("com.cp.camera") # stop the app process
