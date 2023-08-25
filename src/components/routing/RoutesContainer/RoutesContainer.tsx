import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorNotFound from '../../../pages/ErrorNotFound';
import router from '../../../shared/services/router';
import Home from '../../../pages/Home';
import GuestRoute from '../GuestRoute';
import MultipleRoute from '../MultipleRoute';
import PrivateRoute from '../PrivateRoute';
import PrivateRouteWithoutLayouts from '../PrivateRouteWithoutLayouts';
import GarageCreateNewCar from '../../../pages/GarageNew/components/GarageCreateNewCar';
import GarageRoute from '../GarageRoute';
const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRouteWithoutLayouts />}>
        <Route path={router.auth.onboarding.path} element={router.auth.onboarding.component} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path={router.profile.path} index={router.profile.index} element={router.profile.component} />
        <Route
          path={router.organizer.path}
          index={router.organizer.index}
          element={router.organizer.component}
        />
        <Route path={router.todo.path} element={router.todo.component}>
          <Route
            path={router.todo.children.checklists.path}
            element={router.todo.children.checklists.component}
          />
          <Route path={router.todo.children.notes.path} element={router.todo.children.notes.component} />
        </Route>
        <Route path={router.calendar.path} element={router.calendar.component} />
        <Route path={router.journal.path} element={router.journal.component} />
        <Route path={`${router.backlog.path}`} element={router.backlog.component} />
        <Route path={router.roadmap.path} index={router.roadmap.index} element={router.roadmap.component} />

        <Route path={router.garage.path} element={router.garage.component} />
        <Route path={`${router.garage.path}/:id`} element={router.garage.children.component} />
        <Route path={`${router.garageNew.path}`} element={router.garageNew.component}>
          <Route
            path={`${router.garageNew.children.garageCardInformation.path}/:id`}
            element={router.garageNew.children.garageCardInformation.component}
          >
            <Route
              element={router.garageNew.children.garageCardInformation.generalInfo.component}
              path={router.garageNew.children.garageCardInformation.generalInfo.path}
            />
            <Route
              element={router.garageNew.children.garageCardInformation.insurance.component}
              path={router.garageNew.children.garageCardInformation.insurance.path}
            />
            <Route
              element={router.garageNew.children.garageCardInformation.gallery.component}
              path={router.garageNew.children.garageCardInformation.gallery.path}
            />
            <Route
              element={router.garageNew.children.garageCardInformation.share.component}
              path={router.garageNew.children.garageCardInformation.share.path}
            />
          </Route>

          <Route
            path={router.garageNew.children.garageMain.path}
            element={router.garageNew.children.garageMain.component}
          />
          <Route
            path={router.garageNew.children.preStep.path}
            element={router.garageNew.children.preStep.component}
          >
            <Route
              path={router.garageNew.children.preStep.children.bestWay.path}
              element={router.garageNew.children.preStep.children.bestWay.component}
            />
            <Route
              path={router.garageNew.children.preStep.children.HubmeeAI.path}
              element={router.garageNew.children.preStep.children.HubmeeAI.component}
            />
            <Route
              path={router.garageNew.children.preStep.children.manual.path}
              element={router.garageNew.children.preStep.children.manual.component}
            />
          </Route>
        </Route>
        <Route element={<GarageRoute />}>
          <Route path="create-car" element={<GarageCreateNewCar />} />
        </Route>
        <Route path={router.network.path} element={router.network.component}>
          <Route path=":type" element={router.network.component} />
        </Route>

        <Route path={router.networkNew.path} element={router.networkNew.component}>
          <Route
            path={router.networkNew.children.connections.path}
            element={router.networkNew.children.connections.component}
          >
            <Route path=":type" element={router.networkNew.component}>
              <Route path=":id" element={router.networkNew.component} />
            </Route>
          </Route>

          <Route
            path={router.networkNew.children.contacts.path}
            element={router.networkNew.children.contacts.component}
          />
        </Route>

        <Route path={router.chat.path} element={router.chat.component}>
          <Route path=":type" element={router.chat.component}>
            <Route path=":id" element={router.chat.component} />
          </Route>
        </Route>

        <Route path={`${router.settings.path}/`} element={router.settings.component}>
          <Route
            path={router.settings.children.generalSettings.path}
            element={router.settings.children.generalSettings.component}
          />
          <Route
            path={router.settings.children.plans.path}
            element={router.settings.children.plans.component}
          />
          <Route
            path={router.settings.children.hubs.path}
            element={router.settings.children.hubs.component}
          />
          <Route
            path={router.settings.children.wallet.path}
            element={router.settings.children.wallet.component}
          />
          <Route
            path={router.settings.children.archive.path}
            element={router.settings.children.archive.component}
          />
          <Route
            path={router.settings.children.logout.path}
            element={router.settings.children.logout.component}
          />
        </Route>
        <Route path={router.feedback.path} element={router.feedback.component} />
      </Route>

      <Route element={<GuestRoute />}>
        <Route path={router.auth.signIn.path} element={router.auth.signIn.component} />
        <Route path={router.auth.signUp.path} element={router.auth.signUp.component} />
        <Route path={router.auth.signUpPhone.path} element={router.auth.signUpPhone.component} />
        <Route path={router.auth.signUpEmail.path} element={router.auth.signUpEmail.component} />
        <Route path={router.auth.signInPhone.path} element={router.auth.signInPhone.component} />
        <Route path={router.auth.SignInEmail.path} element={router.auth.SignInEmail.component} />
      </Route>
      <Route element={<MultipleRoute />}>
        <Route path={router.auth.activateAccount.path} element={router.auth.activateAccount.component} />
      </Route>
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
};

export default RoutesContainer;
