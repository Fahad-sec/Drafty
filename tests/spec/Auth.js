import {setupAuthListeners} from '../../js/storage.js'

describe ('test suite: authentication',() => {
    
   let mockSupabase;

   afterEach(() => {
    document.getElementById('auth-container').innerHTML= ''
   })

    beforeEach(() => {
      
      document.getElementById('auth-container').innerHTML = `
              <div id="auth-modal" class="auth-overlay">
          <div class="auth-container">
               <h2 class="login-header">Welcome back!</h2>
            <input type="email" id="auth-email" placeholder="Email" class="input-email">
            <input type="password" id="auth-password" placeholder="Password" class="input-passwd">
              <button id="login-btn" class="input-login">Login</button>
              <button id="signup-btn" class="input-signup">Sign up</button>
          <p id="auth-error" style="color:red;"></p>

          </div>

        </div>
             
        <div id="main-app" class="main-overlay">
        </div>
            <button class="logout-btn" id="logout-btn">Logout</button>
      `

      mockSupabase = {
        auth:  {
             onAuthStateChange: jasmine.createSpy('onAuthStateChange'),
             signInWithPassword: jasmine.createSpy('signInWithPassword'),
             signOut: jasmine.createSpy('signOut'),
             signUp: jasmine.createSpy('signUp')
        }
      }
          mockSupabase.auth.signUp.and.returnValue(Promise.resolve({data: {user: {}}, error: null}))

          spyOn(window, 'alert').and.stub();

    })







  it ('Sign-up test', async () => {
    setupAuthListeners(null, mockSupabase)
    document.getElementById('signup-btn').click();

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockSupabase.auth.signUp).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Check your email for a confirmation link!')
    

  })
})