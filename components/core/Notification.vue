<template>
  <div class="notifications fixed">
    <transition-group name="fade-in-down">
      <div
        v-for="(notification, index) in notifications"
        class="notification mt30 border-box cl-white"
        :key="`${notification.type}_${index}`"
        :class="notification.type"
      >
        <div
          @click="execAction(notification.action1, index)"
          class="message py-5"
          data-testid="notificationMessage"
        >
          {{ notification.message }}
        </div>
        <div class="mt-2">
          <div v-if="notification.action1" class="mb-1">
            <div class="inline-block">
              <button-full @click.native="execAction(notification.action1, index)" id="notificationAction1" data-testid="notificationAction1" class="bg-primary">
                {{ notification.action1.label }}
              </button-full>
            </div>
          </div>

          <div v-if="notification.action2" class="inline-block">
            <button-full @click.native="execAction(notification.action2, index)" id="notificationAction2" data-testid="notificationAction2" class="btn-link">
              {{ notification.action2.label }}
            </button-full>
          </div>

        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { Notification } from '@vue-storefront/core/modules/notification/components/Notification'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  mixins: [Notification],
  components: { ButtonFull },
  methods: {
    execAction (action, index) {
      if (action.action) {
        // for backward compatibility
        if (action.action === 'close') {
          this.$store.dispatch('notification/removeNotification', index)
        } else {
          action.action()
        }
      }
      this.$store.dispatch('notification/removeNotification', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$z-index-notification: map-get($z-index, notification);
$color-error: color(error);
$color-success: color(success);
$color-warning: color(warning);
$color-info: color(accent);
$color-action: color(black);

.notifications {
  top: 160px;
  left: 50%;
  width: 360px;
  margin-left: -160px;
  z-index: $z-index-notification;
  will-change: transform;
  pointer-events: auto;

  @media (max-width: 64em) {
    width: auto;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    margin-left: 0;

    .fade-in-down-enter,
    .fade-in-down-leave-to {
      transform: translateY(100%);
    }
  }
}

.notification {
  @apply border;
  padding: 25px 35px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 40px rgba(0,0,0,.3);

  &:first-child  {
    margin-top: 0;
  }

  .message {
    color: #222222;
    font-size: 18px;
  }
}

.success {
  // background: $color-success;
}
.error {
  // background: $color-error;
}
.warning {
  // background: $color-warning;
}
.info {
  // background: $color-info;
}

.actions {
  display: flex;
  justify-content: space-between;

  .notification-action {
    background: rgba($color-action, .2);
  }

  #notificationAction2 {
    width: 100%;
  }
}

.action-border {
  border-right: 2px solid transparent;
  &.border-success {
    border-right-color: $color-success;
  }
  &.border-error {
    border-color: $color-error;
  }
  &.border-warning {
    border-color: $color-warning;
  }
  &.border-info {
    border-color: $color-info;
  }
}
</style>
