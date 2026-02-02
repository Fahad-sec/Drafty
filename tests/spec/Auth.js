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
             signUp: jasmine.createSpy('signUp'),
             getUser: jasmine.createSpy('getUser')
        }
      }
          mockSupabase.auth.signUp.and.returnValue(Promise.resolve({data: {user: {}}, error: null}))

          spyOn(window, 'alert').and.stub();
        
        
    });
  



  it ('Sign-up test', async () => {
    document.getElementById('auth-email').value = 'spec@gmail.com';
    document.getElementById('auth-password').value = 'password123';

    setupAuthListeners(null, mockSupabase)
    document.getElementById('signup-btn').click();

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'spec@gmail.com',
      password: 'password123'
    });
    expect(window.alert).toHaveBeenCalledWith('Check your email for a confirmation link!')
  })

  it ('sign-up error', async() => {
    mockSupabase.auth.signUp.and.returnValue(Promise.resolve({
      data: null,
      error: {message: 'Email already in use'}
    }));

    setupAuthListeners(null, mockSupabase);

    document.getElementById('signup-btn').click();

    await new Promise(resolve => setTimeout(resolve, 0));

    const errorElement = document.getElementById('auth-error');
    expect(errorElement.innerText).toBe('Email already in use')
    expect(window.alert).not.toHaveBeenCalled();
  }) 

  it('login-btn-test', async() => {
       
    mockSupabase.auth.signInWithPassword.and.returnValue(new Promise(() => {})
    )

    const storage = await import ('../../js/storage.js');
    spyOn(storage, 'setupAuthListeners').and.callThrough();

    setupAuthListeners(null, mockSupabase);
    document.getElementById('auth-email').value = 'test@gmail.com';
    document.getElementById('auth-password').value = 'test123';
    document.getElementById('login-btn').click();
    
    

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({ 
      email: 'test@gmail.com',
      password: 'test123'
    });
  })

  it ('login-fail-test', async() => {
    mockSupabase.auth.signInWithPassword.and.returnValue(Promise.resolve({
      data: null,
      error: {message: 'invalid creds'}
    }))

    setupAuthListeners(null, mockSupabase);
    document.getElementById('login-btn').click();

    await new Promise(resolve => setTimeout(resolve, 0))
    const error = document.getElementById('auth-error');

    expect(error.innerText).toBe('invalid creds')
  })

  /*it ('logout-test', async() => {
    mockSupabase.auth.signOut.and.returnValue(Promise.resolve({error: null}));

      setupAuthListeners(null, mockSupabase);
      document.getElementById('logout-btn').click()
      await new Promise(resolve => setTimeout(resolve, 0)) 


      expect (mockSupabase.auth.signOut).toHaveBeenCalled();


  })*/



})